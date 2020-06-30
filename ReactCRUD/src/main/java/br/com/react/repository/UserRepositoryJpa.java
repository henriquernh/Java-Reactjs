package br.com.react.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.react.model.User;

@Repository
public interface UserRepositoryJpa extends JpaRepository<User, Long> {
	
}
