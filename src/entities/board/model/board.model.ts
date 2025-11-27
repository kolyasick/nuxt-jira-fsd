import type { Board, BoardStatus } from "~~/prisma/generated/prisma/client";

export interface IBoardStatus extends BoardStatus {
  status: BoardStatus;
}

export interface BoardWithStatuses extends Board {
  statuses: IBoardStatus[];
}
