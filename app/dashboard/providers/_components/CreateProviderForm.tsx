"use client";

import { createProvider, CreateProviderState } from "@/actions/providers/create";
import { Button, Input } from "@nextui-org/react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function CreateProviderForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [state, formAction] = useFormState<CreateProviderState, FormData>(
    createProvider,
    {}
  );

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Input
        label="Nombre"
        placeholder="Distribuidora"
        name="providerName"
        maxLength={100}
        isRequired
      />

      <Input
        label="Correo electrónico"
        placeholder="proveedor@correo.com"
        name="providerEmail"
        type="email"
        isRequired
      />

      <Input
        label="Teléfono"
        placeholder="4421234567"
        name="providerPhoneNumber"
        maxLength={15}
      />

      {state.error && (
        <p className="text-sm text-danger" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" color="primary">
        Crear proveedor
      </Button>
    </form>
  );
}
