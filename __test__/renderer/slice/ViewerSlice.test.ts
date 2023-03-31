import { setItem } from '../../../src/renderer/slice/ViewerSlice';
import { setupStore } from '../../../src/renderer/Store';

describe('setItem', () => {
  test('正しく追加できる', () => {
    const store = setupStore();
    store.dispatch(
      setItem([
        { path: './foo.jpg', name: 'foo.jpg',stats: {} as any },
        { path: './hoge.png', name: 'hoge.png',stats: {} as any },
      ]),
    );
    const afterState = store.getState().viewer.item;
    expect(afterState).toEqual({
      0: { path: './foo.jpg', name: 'foo.jpg',stats: {} as any },
      1: { path: './hoge.png', name: 'hoge.png',stats: {} as any },
    });
  });
});
