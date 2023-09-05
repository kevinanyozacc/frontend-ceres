/* eslint-disable import/no-anonymous-default-export */
export default function (coords = [], range = 1) {
  return new Array(range).fill(coords, 0, range);
}
