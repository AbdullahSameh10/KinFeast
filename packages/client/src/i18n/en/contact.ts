export const contact = {
  hero: {
    badge: "We'd love to hear from you",
    title: "Let's talk about",
    highlight: "what's cooking.",
    description:
      "Have a question, a suggestion, or something you'd like the KinFeast team to know? Send us a message and we'll make sure it reaches the right place.",
  },

  info: {
    eyebrow: "Get in touch",
    title: "A message away",
    description:
      "Whether you're sharing feedback or asking for help, every message helps us make KinFeast better.",
    emailTitle: "Email us",
    email: "hello@kinfeast.com",
    responseTitle: "Response time",
    responseDescription:
      "We aim to review contact messages as quickly as possible during our working hours.",
    locationTitle: "Our kitchen",
    locationDescription:
      "KinFeast is a digital food community, so our table is wherever food lovers are.",
  },

  form: {
    eyebrow: "Send a message",
    title: "How can we help?",
    description:
      "Fill out the form below. Your message will be securely saved for the KinFeast team to review.",

    nameLabel: "Name",
    namePlaceholder: "Your name",

    emailLabel: "Email",
    emailPlaceholder: "you@example.com",

    subjectLabel: "Subject",
    subjectPlaceholder: "What can we help with?",

    messageLabel: "Message",
    messagePlaceholder:
      "Tell us what's on your mind...",

    submit: "Send message",
    sending: "Sending...",

    privacyNote:
      "Please don't include passwords or other sensitive information.",

    successTitle: "Message received!",
    successDescription:
      "Thanks for reaching out to KinFeast. Your message has been saved successfully and is ready for our team to review.",

    sendAnother: "Send another message",

    error:
      "We couldn't send your message right now. Please try again in a moment.",

    validation: {
      name: "Please enter your name.",
      emailRequired:
        "Please enter your email address.",
      emailInvalid:
        "Please enter a valid email address.",
      subject: "Please enter a subject.",
      message: "Please enter your message.",
    },
  },
} as const;