import * as service from './service';

export default {
  namespace: 'detail',
  state: {
    data: {},
    loading: false,
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const { data } = yield call(service.queryTopic, payload);
      yield put({ type: 'loading', payload: false });
      yield put({ type: 'query/success', payload: data });
    },
  },
  reducers: {
    'query/success'(state, { payload }) {
      const [, data] = payload
      const topics = service.parseTopic(data.data)
      return { ...state, data: topics };
    },
    'loading'(state, { payload: data }) {
      return { ...state, loading: data };
    },
    'clean'(state, { payload: data }) {
      return { ...state, data: {} };
    },
  },
  subscriptions: {},
};
