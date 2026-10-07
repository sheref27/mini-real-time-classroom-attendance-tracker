/**
 * useToast — lightweight toast lifecycle hook.
 *
 * Manages a single self-dismissing notification message.
 *
 * Intentionally client-only (uses useState, useEffect, useRef).
 * No 'use client' directive is needed on the hook file itself;
 * the directive on the consuming component pulls this into the
 * client bundle automatically (Next.js 16 module graph rules).
 *
 * Design decisions:
 *  - The timer ref is reset on every `showToast` call so that
 *    repeated saves always give the user the full dismissal window.
 *  - `hideToast` clears the pending timer before hiding, preventing
 *    a stale callback from re-hiding an already-dismissed toast.
 *  - The cleanup in useEffect prevents a setState call on an
 *    unmounted component if the host component unmounts while a
 *    timer is still pending.
 */

import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ToastState {
  visible: boolean;
  message: string;
}

export interface UseToastReturn {
  toast: ToastState;
  showToast: (message: string) => void;
  hideToast: () => void;
}

// ── Default ──────────────────────────────────────────────────────────────────

const DEFAULT_DURATION_MS = 3000;

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useToast(
  duration: number = DEFAULT_DURATION_MS,
): UseToastReturn {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
  });

  // A ref keeps the timer ID stable across renders without triggering effects
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string) => {
      // Cancel any existing countdown before starting a fresh one
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      setToast({ visible: true, message });

      timerRef.current = setTimeout(() => {
        setToast({ visible: false, message: "" });
        timerRef.current = null;
      }, duration);
    },
    [duration],
  );

  const hideToast = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast({ visible: false, message: "" });
  }, []);

  // Guard: clear the timer if the component that owns this hook unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { toast, showToast, hideToast };
}
