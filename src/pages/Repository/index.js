import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FaSpinner,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  Loading,
  Owner,
  IssuesList,
  Filter,
  Button,
  NavigatorButton,
} from './styles';

import Container from '../Container';

function Repository({ match }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [selectedButton, setSelected] = useState([1, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState('open');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const repoName = decodeURIComponent(match.params.repository);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const [repo, iss] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state,
            per_page: perPage,
            page,
          },
        }),
      ]);

      setRepository(repo.data);
      setIssues(iss.data);
      setLoading(false);
    }
    getData();
  }, [repoName, state, page, perPage]);

  function handleButtom(e) {
    switch (e.target.id) {
      case '0':
        setState('open');
        setPage(1);
        setSelected([1, 0, 0]);
        break;
      case '1':
        setState('closed');
        setPage(1);
        setSelected([0, 1, 0]);
        break;
      case '2':
        setState('all');
        setPage(1);
        setSelected([0, 0, 1]);
        break;
      default:
        break;
    }
  }

  function handleNav(e) {
    switch (e.target.id) {
      case '0':
        setPage((prev) => prev - 1);
        break;
      case '1':
        setPage((prev) => prev + 1);
        break;
      default:
        break;
    }
  }

  function handleSelect(e) {
    setPerPage(e.target.value);
  }

  if (loading) {
    return (
      <Loading>
        <FaSpinner />
      </Loading>
    );
  }

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar a todos os repositórios</Link>
        <div className="header">
          <img src={repository.owner.avatar_url} alt={repository.name} />
          <div className="desc">
            <h1>
              {repository.name.charAt(0).toUpperCase() +
                repository.name.slice(1)}
            </h1>
            <p>{repository.description}</p>
          </div>
        </div>
      </Owner>

      <IssuesList>
        <Filter>
          <div className="buttons">
            <Button
              id="0"
              type="button"
              selected={selectedButton[0]}
              onClick={handleButtom}
            >
              Aberto
            </Button>
            <Button
              id="1"
              type="button"
              selected={selectedButton[1]}
              onClick={handleButtom}
            >
              Fechado
            </Button>
            <Button
              id="2"
              type="button"
              selected={selectedButton[2]}
              onClick={handleButtom}
            >
              Todos
            </Button>
          </div>
          <select onChange={handleSelect} value={perPage}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </Filter>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
                <p />
                <a href={issue.html_url}>{issue.title}</a>

                <p>@{issue.user.login}</p>
              </strong>
            </div>
          </li>
        ))}
      </IssuesList>

      <NavigatorButton>
        <button
          id="0"
          type="button"
          onClick={handleNav}
          disabled={page === 1 ? 1 : 0}
        >
          <FaArrowAltCircleLeft />
        </button>

        <p>{page}</p>

        <button id="1" type="button" onClick={handleNav}>
          <FaArrowAltCircleRight />
        </button>
      </NavigatorButton>
    </Container>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
