import deleteLocation from "@/actions/locations/delete";
import { Button } from "@nextui-org/react";

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
        Borrar tienda
      </Button>
    </form>
  );
}