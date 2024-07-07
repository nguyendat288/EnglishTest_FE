export const PUBLIC_PATH = {
    LOGIN: "/login",
    REGISTER: "/register",
    NOT_FOUND: '*',
    UNAUTHORIZED: '/unauthorized'
}

export const ADMIN_PATH = {
    LAYOUT: "/",
    HOME_ADMIN: "/home-Admin",
    CHECK_ADMIN: "/admin",
    UPLOAD_FILE: "/uploadfile",
    CREATE_TEST: "/create-test",
    LIST_TEST_DETAIL_ADMIN: '/test-detail-admin/:testId',
    CREATE_QUESTION: '/create-question',
    LIST_QUESTION: '/list-question',
    LIST_TEST_ADMIN: '/list-test-admin',
    DETAIL_QUESTION: '/question/:questionId',
    CHAT :'/chat/:userId'
}   

export const USER_PATH = {
    LAYOUT: "/",
    HOME_USER: "/home-User",
    CHECK_USER: "/user",
    LIST_TEST_USER: '/list-test',
    ANSWER_TEST_DETAIL: '/answer-test-detail/:testDetailId/:testId/:userId',
    LIST_TEST_DETAIL: '/list-test-detail',
    TEST_START: '/test-start/:testId',
    TEST_DETAIL: '/test-detail/:testId',
    TEST_FINISH: '/test-finish/:newScore/:dateStart/:testId',
    QUIZ : '/quiz/:testId/:time',
    
}