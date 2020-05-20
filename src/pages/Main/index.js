import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Form, SubmitButton, List } from './styles';
import api from '../../services/api';
import Container from '../Container';

function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const repo = localStorage.getItem('repositories');
    if (repo) {
      setRepositories(JSON.parse(repo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleInputChange = (e) => {
    setNewRepo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (repositories.find((r) => r.name === newRepo)) {
        throw Error('Repositório duplicado');
      }
      await api.get(`/repos/${newRepo}`);

      setRepositories([
        ...repositories,
        {
          name: newRepo,
        },
      ]);

      setNewRepo('');

      setLoading(false);
      setNotFound(false);
    } catch (error) {
      setNotFound(true);
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt className="icone" />
        Repositórios
      </h1>
      <Form onSubmit={handleSubmit} notFound={notFound}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          onChange={handleInputChange}
          value={newRepo}
        />
        <SubmitButton loading={loading ? 1 : 0} notFound={notFound}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map((repository) => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
