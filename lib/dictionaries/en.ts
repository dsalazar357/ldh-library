const en = {
  // Common
  common: {
    appName: "LDH Library",
    signedInAs: "Signed in as",
    signOut: "Sign Out",
    download: "Download",
    delete: "Delete",
    confirm: "Confirm",
    cancel: "Cancel",
    save: "Save Changes",
    saving: "Saving...",
    reset: "Reset",
    back: "Back",
    clearAllFilters: "Clear all filters",
    uploadedBy: "Uploaded by",
    unknown: "Unknown",
    degree: "Degree",
    required: "required",
  },

  // Navigation
  nav: {
    home: "Home",
    rituals: "Rituals",
    studyDocs: "Study Docs",
    upload: "Upload",
    uploadDoc: "Upload Doc",
    users: "Users",
  },

  // Login
  login: {
    title: "LDH Library",
    subtitle: "Sign in to access the library",
    username: "Username",
    password: "Password",
    usernamePlaceholder: "Enter your username",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    signingIn: "Signing in...",
  },

  // Home page
  home: {
    title: "LDH Library",
    subtitle: "Search and browse rituals and study documents.",
    ritualsTab: "Rituals",
    studyDocsTab: "Study Documents",
    searchByTitle: "Search by title...",
    allCountries: "All Countries",
    allDegrees: "All Degrees",
    filterByOrganization: "Filter by organization...",
    noRitualsFound: "No rituals found",
    ritualsFound: (count: number) =>
      `${count} ritual${count !== 1 ? "s" : ""} found`,
    noDocsFound: "No documents found",
    docsFound: (count: number) =>
      `${count} document${count !== 1 ? "s" : ""} found`,
    noRitualsMatch: "No rituals match your filters",
    tryAdjustingRituals: "Try adjusting the country, degree, or search term.",
    noDocsMatch: "No documents match your filters",
    tryAdjustingDocs: "Try adjusting the organization or search term.",
  },

  // Rituals page
  ritualsPage: {
    title: "Rituals",
    subtitle: "Browse and manage ritual documents.",
    uploadRitual: "+ Upload Ritual",
    noRitualsFound: "No rituals found",
    noRitualsYet: "There are no rituals in the library yet.",
    author: "Author",
    country: "Country",
  },

  // Study documents page
  studyDocsPage: {
    title: "Study Documents",
    subtitle: "Browse and manage study documents.",
    uploadDocument: "+ Upload Document",
    noDocsFound: "No study documents found",
    noDocsYet: "There are no study documents in the library yet.",
    organization: "Organization",
    author: "Author",
  },

  // Upload ritual page
  uploadRitualPage: {
    title: "Upload Ritual",
    subtitle: "Upload a new ritual document to the LDH Library.",
    titleLabel: "Title",
    titlePlaceholder: "e.g. Emulation Lodge of Improvement",
    degreeLabel: "Degree",
    countryLabel: "Country",
    selectCountry: "Select a country",
    fileLabel: "File",
    fileHint: "Max file size: 50MB. Supports PDF, images, and other document formats.",
    uploading: "Uploading...",
    uploadRitual: "Upload Ritual",
  },

  // Upload study document page
  uploadDocPage: {
    title: "Upload Study Document",
    subtitle: "Upload a new study document to the LDH Library.",
    titleLabel: "Title",
    titlePlaceholder: "e.g. The Symbolism of Freemasonry",
    organizationLabel: "Organization",
    organizationPlaceholder: "e.g. Grand Lodge of France",
    descriptionLabel: "Description",
    descriptionPlaceholder: "A brief description of the document...",
    fileLabel: "File",
    fileHint: "Max file size: 50MB. Supports PDF, images, and other document formats.",
    uploading: "Uploading...",
    uploadDocument: "Upload Document",
  },

  // Users page
  usersPage: {
    title: "Manage Users",
    subtitle: "Edit user details, change passwords, and manage admin access.",
    createUser: "+ Create User",
    noUsersFound: "No users found",
    noUsersYet: "There are no users in the database yet.",
    noUsername: "No username",
    admin: "Admin",
    username: "Username",
    email: "Email",
    degree: "Degree",
    adminPrivileges: "Admin",
    changePassword: "Change Password",
    cancelPasswordChange: "Cancel Password Change",
    setNewPassword: "Set New Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    newPasswordPlaceholder: "Min. 6 characters",
    confirmPasswordPlaceholder: "Re-enter password",
    updatePassword: "Update Password",
    updatingPassword: "Updating...",
  },

  // Create user page
  createUserPage: {
    title: "Create User",
    subtitle: "Add a new user to the LDH Library system.",
    backToUsers: "Back to Users",
    newUserDetails: "New User Details",
    newUserSubtitle: "Fill in the information below to create a new user account.",
    username: "Username",
    usernamePlaceholder: "e.g. jdoe",
    email: "Email",
    emailPlaceholder: "e.g. jdoe@example.com",
    password: "Password",
    passwordPlaceholder: "Minimum 6 characters",
    degree: "Degree",
    adminPrivileges: "Admin privileges",
    createUser: "Create User",
    creating: "Creating...",
  },

  // Delete confirmations
  deleteConfirm: {
    deleteRitual: (title: string) => `Delete "${title}"?`,
    deleteDoc: (title: string) => `Delete "${title}"?`,
    deleting: "Deleting...",
  },
} as const;

export default en;
export type Dictionary = typeof en;
