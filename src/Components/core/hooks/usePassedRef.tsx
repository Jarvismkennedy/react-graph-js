import { useRef, RefObject } from 'react';

/** Returns passedRef if it is defined, otherwise returns RefObject<T>(null) */
export default function usePassedRef<T>(passedRef?: RefObject<T>) {
    const backupRef = useRef<T>(null);
    if (passedRef === undefined) {
        return backupRef;
    }
    return passedRef;
}
