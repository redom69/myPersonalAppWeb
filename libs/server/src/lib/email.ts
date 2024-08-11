import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const from = 'email@test.com';

// Send welcome email when user is activated in the web using the toggle
// ** In use
export interface WelcomeEmailData {
  full_name: string;
}
export async function welcomeEmail(
  to: string,
  dynamicTemplateData: WelcomeEmailData
) {
  const templateId = 'd-59336437d80e4ba985afef5ddcc03e80';

  return sgMail.send({
    templateId,
    dynamicTemplateData,
    to,
    from,
  });
}

// Reset password
// * In use
export interface ResetPasswordEmailData {
  full_name: string;
  contact_email: string;
  contact_phone: string;
  url_recovery: string;
  email: string;
}
export async function resetPasswordEmail(
  to: string,
  dynamicTemplateData: ResetPasswordEmailData
) {
  const templateId = 'd-f7afc57838e2421f98e69ba8506071d1';
  return sgMail.send({
    templateId,
    dynamicTemplateData,
    to,
    from,
  });
}

// Bye bye email
// ! Deprecated
export interface byeByeEmailData {
  full_name: string;
  contact_email: string;
  contact_phone: string;
}
export async function byeByeEmail(
  to: string,
  dynamicTemplateData: byeByeEmailData
) {
  const templateId = 'd-68fa89fa48f94655a684f746d4344581';
  return sgMail.send({
    templateId,
    dynamicTemplateData,
    to,
    from,
  });
}

// Send email when new user created only in web
// * In use
export interface NewAdminEmailData {
  full_name: string;
  url_login: string;
}

export function sendWelcomeEmailAdmin(
  to: string,
  dynamicTemplateData: NewAdminEmailData
) {
  const templateId = 'd-ad0a62eb5c534dbf9e11c26a435b7108';
  return sgMail.send({
    templateId,
    dynamicTemplateData,
    to,
    from,
  });
}

// Send email to admin when new user registered
// TODO: Check if this is in use (CUANDO SE REGISTRA UN USER)
export interface adminData {
  full_name: string;
  contact_email: string;
  contact_phone: string;
  url_inactive: string;
  email: string;
}

export function sendEmailAdmin(to: string, dynamicTemplateData: adminData) {
  const templateId = 'd-705bf3a30e7a4d6d9b1064f0fb08a073';
  return sgMail.send({
    templateId,
    dynamicTemplateData,
    to,
    from,
  });
}

// Send verification email to user when registered
// * In use
export interface account {
  full_name: string;
  contact_email: string;
  contact_phone: string;
  url_inactive: string;
  email: string;
}

export function verifyAccountUser(to: string, dynamicTemplateData: account) {
  const templateId = 'd-c6ecd4f570aa4592bc4dcc2661645558';
  return sgMail.send({
    templateId,
    dynamicTemplateData,
    to,
    from,
  });
}
