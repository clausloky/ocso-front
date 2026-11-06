import { Provider } from "@/entities";
import { Input, Button } from "@nextui-org/react";
import { updateProvider } from "@/actions/providers/update-provider";

export default function FormUpdateProvider({
  provider,
}: {
  provider: Provider;
}) {
  const { providerId } = provider;

  const updateProviderWithId = updateProvider.bind(null, providerId);

  return (
    <>
      <h1 className="text-xl px-2">Actualizar datos</h1>

      <form
        action={updateProviderWithId}
        className="flex flex-wrap gap-4 flex-grow-0 bg-orange-200 rounded-md px-10 py-10 mr-20 items-center justify-center"
      >
        <Input
          className="max-w-[250px]"
          defaultValue={provider.providerName}
          label="Nombre"
          placeholder="Pecsi"
          name="providerName"
        />

        <Input
          className="max-w-[250px]"
          defaultValue={provider.providerEmail}
          label="Correo"
          placeholder="business@pecsi.com"
          name="providerEmail"
        />

        <Input
          className="max-w-[250px]"
          defaultValue={provider.providerPhoneNumber}
          label="Número"
          placeholder="444XXXXX"
          name="providerPhoneNumber"
        />

        <Button color="primary" type="submit">
          Actualizar
        </Button>
      </form>
    </>
  );
}