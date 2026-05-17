"use client";

import { PlugIcon, RefreshCwIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMidiDevices } from "../hooks/use-midi-devices";
import type { MidiDevice } from "../types";

function connectionLabel(connection: MIDIPortConnectionState) {
  if (connection === "open") return "Conectado";
  if (connection === "pending") return "Conectando";
  return "Desconectado";
}

function DeviceRow({ device }: { device: MidiDevice }) {
  const isConnected = device.connection === "open";

  return (
    <li
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border px-4 py-3",
        isConnected ? "border-primary/30 bg-primary/5" : "border-border",
      )}
    >
      <div className="min-w-0">
        <p className="truncate font-medium">{device.name}</p>
        <p className="truncate text-sm text-muted-foreground">
          {device.manufacturer}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge variant="outline">
          {device.type === "input" ? "Entrada" : "Salida"}
        </Badge>
        <Badge variant={isConnected ? "default" : "secondary"}>
          {connectionLabel(device.connection)}
        </Badge>
      </div>
    </li>
  );
}

function DeviceList({
  title,
  devices,
}: {
  title: string;
  devices: MidiDevice[];
}) {
  if (devices.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <ul className="space-y-2">
        {devices.map((device) => (
          <DeviceRow key={`${device.type}-${device.id}`} device={device} />
        ))}
      </ul>
    </div>
  );
}

export function MidiDevicesPanel() {
  const { status, devices, inputs, outputs, requestAccess, refresh } =
    useMidiDevices();

  if (status === "unsupported") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>MIDI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Tu navegador no soporta Web MIDI. Prueba con Chrome o Edge.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <CardTitle>MIDI</CardTitle>
        <div className="flex gap-2">
          {status === "granted" ? (
            <Button variant="outline" size="sm" onClick={refresh}>
              <RefreshCwIcon className="size-4" />
            </Button>
          ) : null}
          {status !== "granted" ? (
            <Button
              size="sm"
              onClick={() => void requestAccess()}
              disabled={status === "requesting"}
            >
              <PlugIcon className="size-4" />
              {status === "requesting" ? "Buscando…" : "Buscar dispositivos"}
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {status === "idle" ? (
          <p className="text-sm text-muted-foreground">
            Conecta tu interfaz o controlador y pulsa buscar dispositivos.
          </p>
        ) : null}

        {status === "denied" ? (
          <p className="text-sm text-muted-foreground">
            Permiso denegado. Activa MIDI en la configuración del navegador.
          </p>
        ) : null}

        {status === "granted" && devices.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay dispositivos MIDI conectados.
          </p>
        ) : null}

        {status === "granted" && devices.length > 0 ? (
          <div className="space-y-6">
            <DeviceList title="Entradas" devices={inputs} />
            <DeviceList title="Salidas" devices={outputs} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
