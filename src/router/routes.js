import { useRoutes } from "react-router-dom"
import Login from "../components/publich/Login"
import { ADMIN_PATH, PUBLIC_PATH, USER_PATH } from "../contains/path"
import NotFoundPage from "../components/others/NotFoundPage"
import Register from "../components/publich/Register"
import UnAuthorized from "../components/others/UnAuthorized"
import { ROLES } from "../contains/role"
import HomeUser from "../components/user/HomeUser"
import RequireAuth from "../components/others/RequireAuth"
import { Suspense } from "react"
import HomeAdmin from "../components/admin/HomeAdmin"
import CheckAdmin from "../components/admin/CheckAdmin"
import CheckUser from "../components/user/CheckUser"
import NewQuestion from "../components/admin/NewQuestion"
import ListQuestion from "../components/admin/ListQuestion"
import ListTest from "../components/common/ListTest"
import Quiz from "../components/user/Quiz"
import TestFinish from "../components/user/TestFinish"
import TestStart from "../components/user/TestStart"
import ListTestDetail from "../components/user/ListTestDetail"
import AnswerTestDetail from "../components/common/AnswerTestDetail"
import ListTestDetailAdmin from "../components/admin/ListTestDetailAdmin"
import CreateTest from "../components/admin/CreateTest"
import Chat from "../components/chat/Chat"
import TopBar from "../components/others/TopBar"
import FileUpload from "../components/admin/FileUpload"


export default function Router() {
  let router = useRoutes([
    {

      path: PUBLIC_PATH.LOGIN,
      element: <Login />
    },
    {
      path: PUBLIC_PATH.NOT_FOUND,
      element: <NotFoundPage />
    },
    {
      path: PUBLIC_PATH.REGISTER,
      element: <Register />
    },
    {
      path: PUBLIC_PATH.UNAUTHORIZED,
      element: <UnAuthorized />
    },
    {
      path: USER_PATH.LAYOUT,
      element: <HomeUser />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.USER} />,
          children: [
            {
              path: USER_PATH.HOME_USER,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <CheckUser />
                </Suspense>
              )
            },
            {
              path: USER_PATH.LIST_TEST_DETAIL,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ListTestDetail />
                </Suspense>
              )
            },
          ]
        }
      ]
    },
    {
      path: ADMIN_PATH.LAYOUT,
      element: <HomeAdmin />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.ADMIN} />,
          children: [
            {
              path: ADMIN_PATH.HOME_ADMIN,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <CheckAdmin />
                </Suspense>
              )
            },
            {
              path: ADMIN_PATH.CREATE_QUESTION,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <NewQuestion />
                </Suspense>
              )
            },
            {
              path: ADMIN_PATH.LIST_QUESTION,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ListQuestion />
                </Suspense>
              )
            },
            {
              path: ADMIN_PATH.LIST_TEST_ADMIN,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ListTest />
                </Suspense>
              )
            },
            {
              path: ADMIN_PATH.CREATE_TEST,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <CreateTest />
                </Suspense>
              )
            },
            {
              path: ADMIN_PATH.UPLOAD_FILE,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <FileUpload />
                </Suspense>
              )
            },
          ]
        }
      ]
    },
    {
      path: USER_PATH.LAYOUT,
      element: <HomeUser />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.USER} />,
          children: [
            {
              path: USER_PATH.HOME_USER,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <CheckUser />
                </Suspense>
              )
            },
            {
              path: USER_PATH.LIST_TEST_USER,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ListTest />
                </Suspense>
              )
            },
          ]
        }
      ]
    },
    {
      element: <TopBar />,
      children: [
        {
          element: (
            <RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.USER]} />
          ),
          children: [
            // {
            //   path: USER_PATH.LIST_TEST,
            //   element: (
            //     <Suspense fallback={<>Loading...</>}>
            //       <ListTest />
            //     </Suspense>
            //   )
            // },
            {
              path: USER_PATH.ANSWER_TEST_DETAIL,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <AnswerTestDetail />
                </Suspense>
              )
            },
            {
              path: ADMIN_PATH.CHAT,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <Chat />
                </Suspense>
              )
            },
          ]
        },
      ]
    },
    {
      children: [
        {
          element: (
            <RequireAuth allowedRoles={[ROLES.ADMIN]} />
          ),
          children: [
            {
              path: ADMIN_PATH.LIST_TEST_DETAIL_ADMIN,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ListTestDetailAdmin />
                </Suspense>
              )
            },
          ]
        },
      ]
    },
    {
      children: [
        {
          element: (
            <RequireAuth allowedRoles={[ROLES.USER]} />
          ),
          children: [
            {
              path: USER_PATH.TEST_START,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <TestStart />
                </Suspense>
              )
            },
            {
              path: USER_PATH.QUIZ,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <Quiz />
                </Suspense>
              )
            },
            {
              path: USER_PATH.TEST_FINISH,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <TestFinish />
                </Suspense>
              )
            },
          ]
        },
      ]
    },
  ])


  return router
}