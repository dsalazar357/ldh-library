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
};

export default en;

export type Dictionary = {
  common: {
    appName: string;
    signedInAs: string;
    signOut: string;
    download: string;
    delete: string;
    confirm: string;
    cancel: string;
    save: string;
    saving: string;
    reset: string;
    back: string;
    clearAllFilters: string;
    uploadedBy: string;
    unknown: string;
    degree: string;
    required: string;
  };
  nav: {
    home: string;
    rituals: string;
    studyDocs: string;
    upload: string;
    uploadDoc: string;
    users: string;
  };
  login: {
    title: string;
    subtitle: string;
    username: string;
    password: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    signIn: string;
    signingIn: string;
  };
  home: {
    title: string;
    subtitle: string;
    ritualsTab: string;
    studyDocsTab: string;
    searchByTitle: string;
    allCountries: string;
    allDegrees: string;
    filterByOrganization: string;
    noRitualsFound: string;
    ritualsFound: (count: number) => string;
    noDocsFound: string;
    docsFound: (count: number) => string;
    noRitualsMatch: string;
    tryAdjustingRituals: string;
    noDocsMatch: string;
    tryAdjustingDocs: string;
  };
  ritualsPage: {
    title: string;
    subtitle: string;
    uploadRitual: string;
    noRitualsFound: string;
    noRitualsYet: string;
    author: string;
    country: string;
  };
  studyDocsPage: {
    title: string;
    subtitle: string;
    uploadDocument: string;
    noDocsFound: string;
    noDocsYet: string;
    organization: string;
    author: string;
  };
  uploadRitualPage: {
    title: string;
    subtitle: string;
    titleLabel: string;
    titlePlaceholder: string;
    degreeLabel: string;
    countryLabel: string;
    selectCountry: string;
    fileLabel: string;
    fileHint: string;
    uploading: string;
    uploadRitual: string;
  };
  uploadDocPage: {
    title: string;
    subtitle: string;
    titleLabel: string;
    titlePlaceholder: string;
    organizationLabel: string;
    organizationPlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    fileLabel: string;
    fileHint: string;
    uploading: string;
    uploadDocument: string;
  };
  usersPage: {
    title: string;
    subtitle: string;
    createUser: string;
    noUsersFound: string;
    noUsersYet: string;
    noUsername: string;
    admin: string;
    username: string;
    email: string;
    degree: string;
    adminPrivileges: string;
    changePassword: string;
    cancelPasswordChange: string;
    setNewPassword: string;
    newPassword: string;
    confirmPassword: string;
    newPasswordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    updatePassword: string;
    updatingPassword: string;
  };
  createUserPage: {
    title: string;
    subtitle: string;
    backToUsers: string;
    newUserDetails: string;
    newUserSubtitle: string;
    username: string;
    usernamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    degree: string;
    adminPrivileges: string;
    createUser: string;
    creating: string;
  };
  deleteConfirm: {
    deleteRitual: (title: string) => string;
    deleteDoc: (title: string) => string;
    deleting: string;
  };
};
