package br.com.react.controller.rest;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.react.model.User;
import br.com.react.repository.UserRepositoryJpa;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserControleRest {

	@Autowired
	private UserRepositoryJpa userRepositoryJpa;
	
	@PostMapping(value = "/salvar", consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> salvar (@RequestBody  User user) {
		
		User getUser =	userRepositoryJpa.save(user);
		
		return new ResponseEntity<>(getUser ,HttpStatus.OK);
		
	}
	
	@RequestMapping(value= "/listaUsers", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> listar() {
		
		List<User> lista = userRepositoryJpa.findAll();
		
		return !lista.isEmpty() ? new ResponseEntity<>(lista , HttpStatus.OK) : 
	                              new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
		
	}
		
	@RequestMapping(value= "**/getUserById/{id}", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> userById(@PathVariable Long id) {
		
		Optional<User> getUser = userRepositoryJpa.findById(id);
		
		return getUser.isPresent() ? new ResponseEntity<>(getUser.get() , HttpStatus.OK) : 
            						 new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/delete/{id}")
	ResponseEntity<?> deleteUser(@PathVariable Long id){
		
		System.out.println("CHamou o metodo deletar ");
		
		userRepositoryJpa.deleteById(id);
		
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("**/update/{id}")
	ResponseEntity<User> updateUser (@Valid @RequestBody User user){
		
		User result = userRepositoryJpa.save(user);
		return ResponseEntity.ok().body(result);
		
	}
	
	@RequestMapping(value= "**/listaById/{id}", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public User ListById(@PathVariable Long id) {
		
		Optional<User> getUser = userRepositoryJpa.findById(id);
		
		return getUser.get();
	}
	
	@RequestMapping(value= "**/listaById2/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> ListById2(@PathVariable Long id) {
		
		Optional<User> getUser = userRepositoryJpa.findById(id);
		
		return getUser.map(response -> ResponseEntity.ok().body(response))
				      .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
}
