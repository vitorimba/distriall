/**
 * Bluetooth BLE printer connection manager.
 * Supports 58mm thermal printers via Web Bluetooth API.
 */

const KNOWN_SERVICES = [
  '000018f0-0000-1000-8000-00805f9b34fb',
  '49535343-fe7d-4ae5-8fa9-9fafd205e455',
];

const KNOWN_CHARACTERISTICS = [
  '00002af1-0000-1000-8000-00805f9b34fb',
  '49535343-8841-43f4-a8d4-ecbe34729bb3',
];

const CHUNK_SIZE = 512;
const CHUNK_DELAY = 50;
const STORAGE_KEY = 'distriall-printer-id';

export class BluetoothPrinter {
  private device: BluetoothDevice | null = null;
  private characteristic: BluetoothRemoteGATTCharacteristic | null = null;

  get isConnected(): boolean {
    return this.device?.gatt?.connected === true && this.characteristic !== null;
  }

  get deviceName(): string | null {
    return this.device?.name ?? null;
  }

  async connect(): Promise<void> {
    let device: BluetoothDevice;

    try {
      // Try with known service filters first
      device = await navigator.bluetooth.requestDevice({
        filters: KNOWN_SERVICES.map((uuid) => ({ services: [uuid] })),
        optionalServices: KNOWN_SERVICES,
      });
    } catch {
      // Fallback: accept all devices
      device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: KNOWN_SERVICES,
      });
    }

    this.device = device;

    // Save device ID for reconnection hint
    if (device.id) {
      localStorage.setItem(STORAGE_KEY, device.id);
    }

    await this.connectToDevice();
  }

  private async connectToDevice(): Promise<void> {
    if (!this.device?.gatt) throw new Error('No device');

    const server = await this.device.gatt.connect();

    // Try each known service/characteristic pair
    for (const serviceUUID of KNOWN_SERVICES) {
      try {
        const service = await server.getPrimaryService(serviceUUID);
        for (const charUUID of KNOWN_CHARACTERISTICS) {
          try {
            this.characteristic = await service.getCharacteristic(charUUID);
            return;
          } catch {
            // Try next characteristic
          }
        }
        // If no known characteristic, try first writable one
        const chars = await service.getCharacteristics();
        for (const c of chars) {
          if (c.properties.writeWithoutResponse || c.properties.write) {
            this.characteristic = c;
            return;
          }
        }
      } catch {
        // Try next service
      }
    }

    throw new Error('No writable characteristic found');
  }

  async print(data: Uint8Array): Promise<void> {
    if (!this.characteristic) {
      throw new Error('Printer not connected');
    }

    // Send in chunks to avoid buffer overflow
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      const chunk = data.slice(i, i + CHUNK_SIZE);
      if (this.characteristic.properties.writeWithoutResponse) {
        await this.characteristic.writeValueWithoutResponse(chunk);
      } else {
        await this.characteristic.writeValueWithResponse(chunk);
      }
      if (i + CHUNK_SIZE < data.length) {
        await new Promise((r) => setTimeout(r, CHUNK_DELAY));
      }
    }
  }

  disconnect(): void {
    if (this.device?.gatt?.connected) {
      this.device.gatt.disconnect();
    }
    this.characteristic = null;
  }

  static isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'bluetooth' in navigator;
  }
}
