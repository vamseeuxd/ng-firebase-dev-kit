import {
  Observable,
  BehaviorSubject,
  defer,
  of,
  combineLatest,
  from,
} from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
/* eslint-disable no-useless-catch */
import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  OrderByDirection,
  QueryConstraint,
  WhereFilterOp,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';

export interface IOrderByQuery {
  fieldPath: string;
  directionStr?: OrderByDirection | undefined;
}

export interface IWhereQuery {
  fieldPath: string;
  opStr: WhereFilterOp;
  value: unknown;
}

export interface ICollotionManager<T> {
  add: (data: T) => Promise<DocumentReference<DocumentData>>;
  remove: (id: string) => Promise<void>;
  update: (id: string, data: T) => Promise<void>;
  trackBy: (index: number, item: T) => string;
  updateQuery: (
    orderByQueries: {
      fieldPath: string;
      directionStr?: OrderByDirection | undefined;
    }[],
    whereQueries: { fieldPath: string; opStr: WhereFilterOp; value: unknown }[]
  ) => void;
  data$: Observable<T[]>;
  filterData$: Observable<T[]>;
}

export interface ITimestamp {
  seconds: number;
  nanoseconds: number;
}

export const updateRelativeField = (
  firestore: Firestore,
  field: string,
  collectionName: string,
  docName: string
) => {
  return function (source: Observable<any>): Observable<any> {
    return defer(() => {
      // Operator state
      let collectionDataRef: any[];
      return source.pipe(
        switchMap((data: any[]) => {
          collectionDataRef = data;
          const reads$ = [];
          for (const ddoc of collectionDataRef) {
            if (ddoc[field]) {
              const documentReference = doc(
                collection(firestore, collectionName),
                ddoc[field]
              );
              reads$.push(from(getDoc(documentReference)));
            } else {
              reads$.push(of([]));
            }
          }
          return combineLatest(reads$);
        }),
        map((data: any[]) => {
          return data.map((vv, ii) => {
            return {
              ...collectionDataRef[ii],
              [docName]: { id: vv.id, ...vv.data() },
            };
          });
        })
      );
    });
  };
};

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  getCollotionManager<T>(
    collectionName: string,
    orderByQueries: IOrderByQuery[] = [],
    whereQueries: IWhereQuery[] = []
  ): ICollotionManager<T> {
    const collectionRef = collection(this.firestore, collectionName);
    const queryParams: QueryConstraint[] = [
      ...orderByQueries.map(dd => orderBy(dd.fieldPath, dd.directionStr)),
      ...whereQueries.map(dd => where(dd.fieldPath, dd.opStr, dd.value)),
    ];
    const queryParamsAction: BehaviorSubject<QueryConstraint[]> =
      new BehaviorSubject(queryParams);
    const queryParams$: Observable<QueryConstraint[]> =
      queryParamsAction.asObservable();
    let userUid: string | undefined = '';
    this.user$.subscribe(user => {
      userUid = user?.uid;
    });
    return {
      updateQuery: (
        orderByQueries: IOrderByQuery[] = [],
        whereQueries: IWhereQuery[] = []
      ) => {
        queryParamsAction.next([
          ...orderByQueries.map(dd => orderBy(dd.fieldPath, dd.directionStr)),
          ...whereQueries.map(dd => where(dd.fieldPath, dd.opStr, dd.value)),
        ]);
      },
      add: async (data: T) => {
        try {
          return addDoc(collectionRef, {
            ...data,
            createdOn: serverTimestamp(),
            createdBy: userUid,
          });
        } catch (error) {
          throw error;
        }
      },
      remove: async (id: string) => {
        const documentReference = doc(collectionRef, id);
        try {
          await deleteDoc(documentReference);
        } catch (error) {
          throw error;
        }
      },
      update: async (id: string, data: T) => {
        const documentReference = doc(collectionRef, id);
        return updateDoc(documentReference, {
          ...data,
          lastUpdatedOn: serverTimestamp(),
          lastUpdatedBy: userUid,
        });
      },
      trackBy(index: number, item: any) {
        return item.id;
      },
      data$: collectionData(collectionRef, { idField: 'id' }) as Observable<
        T[]
      >,
      filterData$: queryParams$.pipe(
        switchMap(data => {
          const collectionWithQuery = query(collectionRef, ...data);
          return collectionData(collectionWithQuery, {
            idField: 'id',
          }) as Observable<T[]>;
        })
      ),
    };
  }
}
