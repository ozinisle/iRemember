import { environment } from '../../environments/environment';

export const IRemember = Object.freeze({
    commonTerms: {
        currentUser: ''
    },
    apiEndPoints: {
        root: `${environment.apiSource}`,
        login: `${environment.apiSource}/authentication/authenticate-user.php`,
        loginUrl: '/login',
        register: `${environment.apiSource}/authentication/register-user.php`,
        signOutUrl: `${environment.apiSource}/authentication/sign-out.php`,
        sendVerificationEmail: `${environment.apiSource}/authentication/send-verification-email.php`,
        iRemUpdateNote: `${environment.apiSource}/irem-notes/update-note.php`,
        iRemGetNotesList: `${environment.apiSource}/irem-notes/get-notes-list.php`,
        iRemGetNotesCategoryList: `${environment.apiSource}/irem-notes/get-notes-category-list.php`,
        iRemSoftDeleteNotes: `${environment.apiSource}/irem-notes/soft-delete-notes.php`,
        iRemHardDeleteNotes: `${environment.apiSource}/irem-notes/hard-delete-notes.php`,
    },
    messages: {
        registrationSuccess: 'Registration successful',
        sendingVerificationCode: 'Sending Verification Code ....',
        youAreLoggedIn: 'You are logged in',
        signedOutMessage: 'User\'s session has been signed out',
        authenticationFailedMessage: 'Authentication failed',
        noteDataSaveFailedMessage: 'Services are down temporarily. Data not saved',
        noteDataSaveSuccessMessage: 'The note has been saved.',
        noteDataDeletionSuccessMessage: 'The selected notes have been deleted',
        noteDataDeletionFailureMessage: 'There has been a problem. Selected Notes were not deleted. Please try after some time',
        servicesDownMessage: 'Services are temporarily down. Please try after some time'
    },
    values: {
        returnUrlParamKey: 'returnUrl',
    },
    sessionStorageItems: {
        loginAndFallBack: 'irem-target-route',
        currentUserData: 'current_user',
        categoryTagData: 'irem-category-tag-data',
        lastSelectedNoteItem: 'last-selected-note-item'
    },
    localStorageItems: {
        lastLoggedInUser: 'iremember-last-logged-in-user'
    }
})