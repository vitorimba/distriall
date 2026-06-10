/**
 * ESC/POS command builder for 58mm thermal printers (32 chars per line).
 */

const LINE_WIDTH = 32;

function stripAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function encode(str: string): number[] {
  return Array.from(stripAccents(str)).map((c) => c.charCodeAt(0) & 0xff);
}

export class ESCPOSBuilder {
  private buffer: number[] = [];

  init(): this {
    this.buffer.push(0x1b, 0x40); // ESC @
    return this;
  }

  align(mode: 'left' | 'center' | 'right'): this {
    const n = mode === 'left' ? 0 : mode === 'center' ? 1 : 2;
    this.buffer.push(0x1b, 0x61, n); // ESC a
    return this;
  }

  bold(on: boolean): this {
    this.buffer.push(0x1b, 0x45, on ? 1 : 0); // ESC E
    return this;
  }

  doubleSize(on: boolean): this {
    this.buffer.push(0x1d, 0x21, on ? 0x11 : 0x00); // GS !
    return this;
  }

  text(str: string): this {
    this.buffer.push(...encode(str));
    return this;
  }

  newline(count = 1): this {
    for (let i = 0; i < count; i++) {
      this.buffer.push(0x0a); // LF
    }
    return this;
  }

  separator(char = '-'): this {
    this.text(char.repeat(LINE_WIDTH));
    this.newline();
    return this;
  }

  fullSeparator(): this {
    this.text('='.repeat(LINE_WIDTH));
    this.newline();
    return this;
  }

  /**
   * Print two columns: left-aligned text and right-aligned text,
   * padded with spaces to fill LINE_WIDTH.
   */
  columns(left: string, right: string, width = LINE_WIDTH): this {
    const l = stripAccents(left);
    const r = stripAccents(right);
    const padding = Math.max(1, width - l.length - r.length);
    this.text(l + ' '.repeat(padding) + r);
    this.newline();
    return this;
  }

  /**
   * Three columns: left, center, right.
   */
  threeColumns(left: string, center: string, right: string, width = LINE_WIDTH): this {
    const l = stripAccents(left);
    const c = stripAccents(center);
    const r = stripAccents(right);
    const totalContent = l.length + c.length + r.length;
    const totalPad = Math.max(2, width - totalContent);
    const padLeft = Math.floor(totalPad / 2);
    const padRight = totalPad - padLeft;
    this.text(l + ' '.repeat(padLeft) + c + ' '.repeat(padRight) + r);
    this.newline();
    return this;
  }

  cut(): this {
    this.newline(3);
    this.buffer.push(0x1d, 0x56, 0x00); // GS V (full cut)
    return this;
  }

  build(): Uint8Array {
    return new Uint8Array(this.buffer);
  }
}
