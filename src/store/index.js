// store.js
import { createStore } from 'vuex';
import userModule from './userModule';
import createPaperModule from './createPaperModule';
import courseModule from './courseModule';
import paperModule from './paperModule';
import evaluationModule from './evaluationModule';
import stuEvaListModule from './stuEvaListModule';
import isLogInModule from './isLogInModule';

export default createStore({
    modules: {
        user: userModule,
        createPaper: createPaperModule,
        course: courseModule,
        paper: paperModule,
        evaluation: evaluationModule,
        stuEvaList: stuEvaListModule,
        isLogIn: isLogInModule
    }
});
