import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
  const searchParams = new URLSearchParams(keyword);
  const extractedKeyword = searchParams.get('keyword');

  return (
    pages > 1 && (
      <Pagination className="justify-content-center">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            activeClassName=""
            to={
              !isAdmin
                ? extractedKeyword
                  ? {
                      pathname: '/',
                      search: `?keyword=${extractedKeyword}&page=${x + 1}`,
                    }
                  : {
                      pathname: '/',
                      search: `?page=${x + 1}`,
                    }
                : extractedKeyword
                ? {
                    pathname: '/admin/productlist',
                    search: `?keyword=${extractedKeyword}&page=${x + 1}`,
                  }
                : {
                    pathname: '/admin/productlist',
                    search: `?page=${x + 1}`,
                  }
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
