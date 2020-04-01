package ewa.backend.repository;

import ewa.backend.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author Robert Neijmeijer
 */@Repository
public interface UserRepositoryInterface {


    User save(User user);

    void delete(User user);

    User deleteById(long id);

    User deleteByEmail(String email);

    User deleteByEmailId(String email, long id);

    List<User> findAll();

    User findByEmail(String email);

    User findByEmailId(String email, long id);

    User findByFirstName(String firstName);

    User findByLastName(String lastName);

    User findById(long id);


}
