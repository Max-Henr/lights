// services/wled.ts

export async function setPower(ip: string, on: boolean) {
  return fetch(`http://${ip}/json/state`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ on }),
  });
}
