const specialCharRegex = /[\n",]/;

export function formatCsv(rows: any[][]): string {
  return rows
    .map(row =>
      row
        .map(value => {
          const str = `${value}`;
          if (specialCharRegex.test(str)) {
            return `"${str.replaceAll('"', '""')}"`;
          }
          return str;
        })
        .join(","),
    )
    .join("\n");
}

export function parseCsv(csv: string): string[][] {
  let inStr = false;
  let char = "";
  let cell = "";
  let row: string[] = [];
  const data: string[][] = [];
  for (let i = 0; i < csv.length; i++) {
    char = csv[i]!;
    if (!inStr) {
      switch (char) {
        case ",": {
          row.push(cell);
          cell = "";
          break;
        }
        case "\n": {
          row.push(cell);
          data.push(row);
          row = [];
          cell = "";
          break;
        }
        case '"': {
          inStr = true;
          break;
        }
        default: {
          cell += char;
        }
      }
    } else if (char === '"') {
      if (csv[i + 1] === '"') {
        cell += char;
        i++;
      } else {
        inStr = false;
      }
    } else {
      cell += char;
    }
  }
  if (cell.length > 0 || char === "," || char === "\n") {
    row.push(cell);
  }
  if (row.length > 0) {
    data.push(row);
  }
  return data;
}
