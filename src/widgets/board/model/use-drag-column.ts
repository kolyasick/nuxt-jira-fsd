import { useMutation } from "@tanstack/vue-query";
import type { ModelRef } from "vue";
import type { IBoardStatus } from "~/entities/board/model";
import { updateStatusesOrder } from "~/shared/api";

export const useDragColumn = (statuses: ModelRef<IBoardStatus[] | undefined>) => {
  const route = useRoute();
  const projectId = route.params.projectId as string;

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["update-column-order", projectId],
    mutationFn: (data: { id: string; statusIds: number[] }) => updateStatusesOrder(data.id, data.statusIds),
  });

  const onColumnChange = async (e: any) => {
    if (!e.moved || !statuses.value) return;

    const statusIds = statuses.value.map((item: IBoardStatus) => item.status.id);

    try {
      const { data } = await mutateAsync({ id: projectId, statusIds });

      if (data) {
        statuses.value = data.statuses;
      }
    } catch (error) {
      console.error("Ошибка при обновлении порядка статусов:", error);
    }
  };

  return {
    isPending,
    onColumnChange,
  };
};
