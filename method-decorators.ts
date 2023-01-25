// @see
// https://zenn.dev/miruoon_892/articles/365675fa5343ed#method-decorators%3A-%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%83%BB%E3%83%87%E3%82%B3%E3%83%AC%E3%83%BC%E3%82%BF

type Direction = '←' | '↖' | '↑' | '↗' | '→' | '↘' | '↓' | '↙';

type Piece = {
  movableDirections: () => Set<Direction>;
}

function addMovableDirections(...directions: Direction[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const beDecoratedFunc = descriptor.value;

    descriptor.value = function () {
      return new Set([...directions, ...beDecoratedFunc.apply(this)])
    }
  };
}

class Rook implements Piece {
  @addMovableDirections('←', '↑', '→', '↓')
  movableDirections() {
    return new Set([]);
  }
}

class Bishop implements Piece {
  @addMovableDirections('↖', '↗', '↘', '↙')
  movableDirections() {
    return new Set([]);
  }
}

class Queen implements Piece {
  @addMovableDirections('←', '↑', '→', '↓', '↖', '↗', '↘', '↙')
  movableDirections() {
    return new Set([]);
  }
}

const rook = new Rook();
console.log('Rook can move to', rook.movableDirections());

const bishop = new Bishop();
console.log('Bishop can move to', bishop.movableDirections());

const queen = new Queen();
console.log('Queen can move to', queen.movableDirections());
