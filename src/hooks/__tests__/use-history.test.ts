import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import { useFormBuilderStore } from '../../stores/form-builder-store';
import { useHistory } from '../../hooks/use-history';
import type { HistorySnapshot, HistoryState } from '@/types/form-builder.types';

// Mock the store for testing
vi.mock('@/stores/form-builder-store');

describe('useHistory', () => {
  const mockStore: any = {
    undo: vi.fn(),
    redo: vi.fn(),
    canUndo: vi.fn(),
    canRedo: vi.fn(),
    saveSnapshot: vi.fn(),
    clearHistory: vi.fn(),
    jumpToSnapshot: vi.fn(),
    history: {
      snapshots: [] as HistorySnapshot[],
      currentIndex: -1,
      maxHistorySize: 50
    } as HistoryState,
    subscriptionInfo: null
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useFormBuilderStore as unknown as Mock).mockReturnValue(mockStore);
  });

  it('should return history methods and state', () => {
    const { result } = renderHook(() => useHistory());

    expect(result.current.undo).toBe(mockStore.undo);
    expect(result.current.redo).toBe(mockStore.redo);
    expect(result.current.saveSnapshot).toBe(mockStore.saveSnapshot);
    expect(result.current.clearHistory).toBe(mockStore.clearHistory);
  });

  it('should call canUndo and canRedo', () => {
    mockStore.canUndo.mockReturnValue(true);
    mockStore.canRedo.mockReturnValue(false);

    const { result } = renderHook(() => useHistory());

    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    expect(mockStore.canUndo).toHaveBeenCalled();
    expect(mockStore.canRedo).toHaveBeenCalled();
  });

  it('should return computed properties correctly', () => {
    mockStore.history = {
      snapshots: [
        { schema: { components: [] }, formTitle: 'Form 1', formId: '1', timestamp: 1 },
        { schema: { components: [] }, formTitle: 'Form 2', formId: '2', timestamp: 2 }
      ],
      currentIndex: 1,
      maxHistorySize: 50
    } as HistoryState;

    const { result } = renderHook(() => useHistory());

    expect(result.current.historyLength).toBe(2);
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.hasHistory).toBe(true);
    expect(result.current.isAtBeginning).toBe(false);
    expect(result.current.isAtEnd).toBe(true);
  });

  it('should handle empty history', () => {
    mockStore.history = {
      snapshots: [],
      currentIndex: -1,
      maxHistorySize: 50
    } as HistoryState;

    const { result } = renderHook(() => useHistory());

    expect(result.current.historyLength).toBe(0);
    expect(result.current.hasHistory).toBe(false);
    expect(result.current.isAtBeginning).toBe(true);
    expect(result.current.isAtEnd).toBe(true);
  });
});
