export const screenNames = {
  client: 'ClientTabs',
  register: 'RegisterScreen',
  login: 'LoginScreen',
  dashboard: 'DashboardStack',
  home: 'HomeScreen',
  project: 'ProjectScreen',
  task: 'TaskScreen',
  settings: 'SettingsScreen',
  projectMembers: 'ProjectMembersScreen',
  projectMember: 'ProjectMemberScreen',
  notes: 'NotesScreen',
  addMember: 'AddMemberScreen',
} as const;

export const structuredScreens = {
  register: screenNames.register,
  login: screenNames.login,
  project: screenNames.project,
  projectMembers: screenNames.projectMembers,
  projectMember: screenNames.projectMember,
  task: screenNames.task,
  addMember: screenNames.addMember,
  client: {
    root: screenNames.client,
    tabs: {
      dashboard: {
        root: screenNames.dashboard,
        screens: {
          home: screenNames.home,
          settings: screenNames.settings,
        },
      },
      notes: screenNames.notes,
    },
  },
} as const;
