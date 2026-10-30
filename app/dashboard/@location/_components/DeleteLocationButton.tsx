import deleteLocation from "@/actions/locations/delete";
import { Button } from "@nextui-org/react";

import { LuTrash } from "react-icons/lu";

export default function DeleteLocationButton({
  store,
}: {
  store: string | null | undefined;
}) {
  if (!store) return null;

  return (
    <form action={deleteLocation}>
      <input type="hidden" name="store" value={store} />

      <Button type="submit" color="danger" variant="flat">
        <LuTrash></LuTrash>
      </Button>
    </form>
  );
}