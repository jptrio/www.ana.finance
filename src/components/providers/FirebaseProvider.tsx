import { firebaseConfig } from '@/config/firebase'
import { getFirestore } from '@firebase/firestore'
import { getDatabase } from 'firebase/database'
import { ReactNode } from 'react'
import {
  DatabaseProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from 'reactfire'

export default function FirebaseProvider({
  children,
}: {
  children: ReactNode
}) {
  const Firestore = ({ children }: { children: ReactNode }) => {
    const firestoreInstance = getFirestore(useFirebaseApp())
    return (
      <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
    )
  }

  const RTDB = ({ children }: { children: ReactNode }) => {
    const database = getDatabase(useFirebaseApp())
    return <DatabaseProvider sdk={database}>{children}</DatabaseProvider>
  }

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <RTDB>{children}</RTDB>
    </FirebaseAppProvider>
  )
}
