/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from 'shabados';
import { TEXTS } from '../../constants';
import PageLoader from '../PageLoader';
import Layout, { Stub } from './Layout';

export default class Search extends React.PureComponent {
  static defaultProps = {
    offset: 0,
  };

  static propTypes = {
    q: PropTypes.string.isRequired,
    type: PropTypes.number,
    source: PropTypes.string,
    offset: PropTypes.number,
  };

  render() {
    const { q, type, source, offset } = this.props;

    if (q === '') {
      return (
        <div className="text-center row" id="content-root">
          <h1>{TEXTS.EMPTY_QUERY}</h1>
        </div>
      );
    }

    const url = encodeURI(buildApiUrl({ q, type, source, offset, API_URL }));

    return (
      <PageLoader url={url}>
        {({ loading, data }) =>
          loading ? (
            <Stub />
          ) : (
            <Layout
              totalResults={data.pageinfo.totalresults || 0}
              resultsCount={data.pageinfo.pageresults || 0}
              offset={offset}
              nextPageOffset={data.pageinfo.nextpageoffset}
              shabads={data.shabads}
              q={q}
              type={type}
              source={source}
            />
          )
        }
      </PageLoader>
    );
  }
}
