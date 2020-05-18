import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Loading, Owner, IssuesList } from './styles';

import Container from '../Container';

function Repository({ match }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const repoName = decodeURIComponent(match.params.repository);
  useEffect(() => {
    async function getData() {
      const [repo, iss] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(repo.data);
      setIssues(iss.data);
      setLoading(false);
    }
    getData();
  }, [repoName]);

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
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </div>
        </div>
      </Owner>

      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
                <p>{issue.user.login}</p>
              </strong>
            </div>
          </li>
        ))}
      </IssuesList>
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
