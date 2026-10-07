import React from "react";
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import { render } from "@react-email/render";
import { sendLovableEmail } from "@lovable.dev/email-js";

export interface TrialNotifyData {
  name: string;
  phone: string; // +90XXXXXXXXXX
  blocker: string;
  discipline: string;
  days: string;
}

const SITE_NAME = "Gorillab Studio";

function formatPhone(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("90")) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  if (d.length !== 10) return phone;
  return `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
}

function waUrl(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("0")) d = d.slice(1);
  if (!d.startsWith("90")) d = "90" + d;
  return `https://wa.me/${d}`;
}

function formatDateTR(date: Date) {
  const parts = new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")} ${get("month")} ${get("year")}, ${get("hour")}:${get("minute")}`;
}

interface EmailProps extends TrialNotifyData {
  date: string;
}

function TrialRequestEmail({ name, phone, blocker, discipline, days, date }: EmailProps) {
  const prettyPhone = formatPhone(phone);
  return (
    <Html lang="tr" dir="ltr">
      <Head />
      <Preview>Yeni deneme dersi talebi: {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Yeni deneme dersi talebi</Heading>
          <Section>
            <Text style={row}>
              <strong>Ad:</strong> {name}
            </Text>
            <Text style={row}>
              <strong>Telefon:</strong>{" "}
              <Link href={`tel:+90${phone.replace(/\D/g, "").replace(/^90/, "").replace(/^0/, "")}`} style={link}>
                {prettyPhone}
              </Link>
            </Text>
            <Text style={row}>
              <Link href={waUrl(phone)} style={link}>
                WhatsApp'tan yaz →
              </Link>
            </Text>
            <Hr style={hr} />
            <Text style={row}>
              <strong>Branş:</strong> {discipline || "—"}
            </Text>
            <Text style={row}>
              <strong>Haftada:</strong> {days || "—"}
            </Text>
            <Text style={row}>
              <strong>Onu durduran:</strong> {blocker || "—"}
            </Text>
            <Hr style={hr} />
            <Text style={muted}>Tarih: {date}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" };
const container = { padding: "24px", maxWidth: "520px" };
const heading = { color: "#0E0E0E", fontSize: "22px", margin: "0 0 16px" };
const row = { color: "#1A1A1A", fontSize: "15px", lineHeight: "24px", margin: "4px 0" };
const link = { color: "#E8442E", textDecoration: "underline" };
const hr = { borderColor: "#E4E0D8", margin: "16px 0" };
const muted = { color: "#9A958E", fontSize: "13px" };

export async function sendTrialNotification(data: TrialNotifyData): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  const senderDomain = process.env["EMAIL_SENDER_DOMAIN"];
  const recipients = (process.env["NOTIFY_EMAIL"] ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey) return { sent: false, reason: "missing_api_key" };
  if (!senderDomain) return { sent: false, reason: "missing_sender_domain" };
  if (recipients.length === 0) return { sent: false, reason: "missing_recipient" };

  const date = formatDateTR(new Date());
  const html = await render(<TrialRequestEmail {...data} date={date} />);
  const text = [
    `Yeni deneme dersi talebi: ${data.name}`,
    `Ad: ${data.name}`,
    `Telefon: ${formatPhone(data.phone)}`,
    `WhatsApp: ${waUrl(data.phone)}`,
    `Branş: ${data.discipline || "—"}`,
    `Haftada: ${data.days || "—"}`,
    `Onu durduran: ${data.blocker || "—"}`,
    `Tarih: ${date}`,
  ].join("\n");

  const [to, ...cc] = recipients;
  const res = await sendLovableEmail(
    {
      to: to!,
      ...(cc.length ? { cc } : {}),
      from: { name: SITE_NAME, address: `noreply@${senderDomain}` },
      sender_domain: senderDomain,
      subject: `Yeni deneme dersi talebi: ${data.name}`,
      html,
      text,
      idempotency_key: `trial-${data.phone.replace(/\D/g, "")}-${Date.now()}`,
    },
    { apiKey },
  );
  return { sent: res.success };
}
