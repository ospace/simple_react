// import DefaultLayout from 'views/layouts/Default';

import Comp from 'views/test/Component';
import Form from 'views/test/Form';
import Api from 'views/test/Api';

const routeData = [
  { path: 'comp', element: <Comp /> },
  { path: 'form', element: <Form /> },
  {
    path: 'api',
    element: <Api />,
    children: [{ path: ':name', element: <Api /> }],
  },
  { path: 'api/:name', element: <Api /> },
];

// const routeData = [
//   {
//     path: '/',
//     element: <DefaultLayout />,
//     children: [
//       { path: '/test01', element: <Test01 /> },
//       {
//         path: '/test02',
//         element: <Test02 />,
//         children: [{ path: ':name', element: <Test02 /> }],
//       },
//       { path: '/test02/:name', element: <Test02 /> },
//       { path: '/test03', element: <Test03 /> },
//     ],
//   },
// ];

export default routeData;
