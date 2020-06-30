package br.com.react.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.react.model.User;

@Repository
public interface UserRepositoryCrud extends CrudRepository<User, Long> {

}
