import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  eventType?: string;
  date?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanValue(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as ContactPayload;

    const name = cleanValue(body.name);
    const email = cleanValue(body.email);
    const phone = cleanValue(body.phone);
    const location = cleanValue(body.location);
    const eventType = cleanValue(
      body.eventType,
    );
    const date = cleanValue(body.date);
    const message = cleanValue(body.message);

    if (!name) {
      return NextResponse.json(
        {
          message: "Please enter your name.",
        },
        {
          status: 400,
        },
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          message: "Please enter your email.",
        },
        {
          status: 400,
        },
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (!eventType) {
      return NextResponse.json(
        {
          message:
            "Please select an event type.",
        },
        {
          status: 400,
        },
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          message:
            "Please enter your message.",
        },
        {
          status: 400,
        },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(
      process.env.SMTP_PORT || 465,
    );
    const smtpSecure =
      process.env.SMTP_SECURE === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const contactToEmail =
      process.env.CONTACT_TO_EMAIL;

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPass ||
      !contactToEmail
    ) {
      console.error(
        "Missing SMTP environment variables.",
      );

      return NextResponse.json(
        {
          message:
            "Email service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    const transporter =
      nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,

        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(
      phone || "Not provided",
    );
    const safeLocation = escapeHtml(
      location || "Not provided",
    );
    const safeEventType =
      escapeHtml(eventType);
    const safeDate = escapeHtml(
      date || "Not provided",
    );
    const safeMessage = escapeHtml(message)
      .replaceAll("\n", "<br />");

    await transporter.sendMail({
      from: `"JKAYY Website" <${smtpUser}>`,

      to: contactToEmail,

      replyTo: {
        name,
        address: email,
      },

      subject: `New ${eventType} enquiry from ${name}`,

      text: `
New JKAYY website enquiry

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Location: ${location || "Not provided"}
Event Type: ${eventType}
Preferred Date: ${date || "Not provided"}

Message:
${message}
      `.trim(),

      html: `
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8" />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background: #090909;
              font-family: Arial, sans-serif;
              color: #f5f3ed;
            "
          >
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="
                width: 100%;
                background: #090909;
                padding: 40px 16px;
              "
            >
              <tr>
                <td align="center">
                  <table
                    role="presentation"
                    width="620"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="
                      width: 100%;
                      max-width: 620px;
                      background: #111111;
                      border: 1px solid #292929;
                    "
                  >
                    <tr>
                      <td
                        style="
                          padding: 36px 38px 28px;
                          border-bottom: 1px solid #292929;
                        "
                      >
                        <p
                          style="
                            margin: 0 0 12px;
                            color: #808080;
                            font-size: 10px;
                            letter-spacing: 3px;
                            text-transform: uppercase;
                          "
                        >
                          New Website Enquiry
                        </p>

                        <h1
                          style="
                            margin: 0;
                            color: #f5f3ed;
                            font-family: Georgia, serif;
                            font-size: 36px;
                            font-weight: 400;
                            line-height: 1.1;
                          "
                        >
                          Start A Conversation
                        </h1>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding: 32px 38px;
                        "
                      >
                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                        >
                          <tr>
                            <td
                              style="
                                padding: 0 0 18px;
                                border-bottom: 1px solid #292929;
                              "
                            >
                              <p
                                style="
                                  margin: 0 0 6px;
                                  color: #707070;
                                  font-size: 9px;
                                  letter-spacing: 2px;
                                  text-transform: uppercase;
                                "
                              >
                                Name
                              </p>

                              <p
                                style="
                                  margin: 0;
                                  color: #f5f3ed;
                                  font-size: 16px;
                                "
                              >
                                ${safeName}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding: 18px 0;
                                border-bottom: 1px solid #292929;
                              "
                            >
                              <p
                                style="
                                  margin: 0 0 6px;
                                  color: #707070;
                                  font-size: 9px;
                                  letter-spacing: 2px;
                                  text-transform: uppercase;
                                "
                              >
                                Email
                              </p>

                              <p
                                style="
                                  margin: 0;
                                  color: #f5f3ed;
                                  font-size: 16px;
                                "
                              >
                                ${safeEmail}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding: 18px 0;
                                border-bottom: 1px solid #292929;
                              "
                            >
                              <p
                                style="
                                  margin: 0 0 6px;
                                  color: #707070;
                                  font-size: 9px;
                                  letter-spacing: 2px;
                                  text-transform: uppercase;
                                "
                              >
                                Phone
                              </p>

                              <p
                                style="
                                  margin: 0;
                                  color: #f5f3ed;
                                  font-size: 16px;
                                "
                              >
                                ${safePhone}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding: 18px 0;
                                border-bottom: 1px solid #292929;
                              "
                            >
                              <p
                                style="
                                  margin: 0 0 6px;
                                  color: #707070;
                                  font-size: 9px;
                                  letter-spacing: 2px;
                                  text-transform: uppercase;
                                "
                              >
                                Location
                              </p>

                              <p
                                style="
                                  margin: 0;
                                  color: #f5f3ed;
                                  font-size: 16px;
                                "
                              >
                                ${safeLocation}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding: 18px 0;
                                border-bottom: 1px solid #292929;
                              "
                            >
                              <p
                                style="
                                  margin: 0 0 6px;
                                  color: #707070;
                                  font-size: 9px;
                                  letter-spacing: 2px;
                                  text-transform: uppercase;
                                "
                              >
                                Event Type
                              </p>

                              <p
                                style="
                                  margin: 0;
                                  color: #f5f3ed;
                                  font-size: 16px;
                                "
                              >
                                ${safeEventType}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding: 18px 0;
                                border-bottom: 1px solid #292929;
                              "
                            >
                              <p
                                style="
                                  margin: 0 0 6px;
                                  color: #707070;
                                  font-size: 9px;
                                  letter-spacing: 2px;
                                  text-transform: uppercase;
                                "
                              >
                                Preferred Date
                              </p>

                              <p
                                style="
                                  margin: 0;
                                  color: #f5f3ed;
                                  font-size: 16px;
                                "
                              >
                                ${safeDate}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding: 24px 0 0;
                              "
                            >
                              <p
                                style="
                                  margin: 0 0 10px;
                                  color: #707070;
                                  font-size: 9px;
                                  letter-spacing: 2px;
                                  text-transform: uppercase;
                                "
                              >
                                Message
                              </p>

                              <p
                                style="
                                  margin: 0;
                                  color: #d6d3ca;
                                  font-size: 15px;
                                  line-height: 1.8;
                                "
                              >
                                ${safeMessage}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding: 22px 38px;
                          border-top: 1px solid #292929;
                          color: #646464;
                          font-size: 10px;
                          letter-spacing: 1px;
                        "
                      >
                        Sent from the JKAYY contact page.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your request has been sent successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "Contact email error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send your request. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}