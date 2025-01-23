import type { Metadata } from "next"
// import "./globals.css"

export const metadata: Metadata = {
  title: "Cafe Caramel",
  description: "Coffee Products Listing",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?display=swap&family=Epilogue:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

