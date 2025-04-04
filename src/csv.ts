const specialCharRegex = /",\n/;

export function formatCsv(rows: any[][]) {
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
