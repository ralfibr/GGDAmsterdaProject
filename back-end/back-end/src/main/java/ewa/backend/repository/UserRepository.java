package ewa.backend.repository;

/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

import ewa.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

//The first annotation is to define that this is the repository for User.
//It's also transactional which means that if any failure occurs when communicating to the database it will reverse every action.
//This way every value has to be added successfully or else nothing will be added.
@Repository
@Transactional
public class UserRepository implements UserRepositoryInterface {

    //Autowired annotation means that em will be injected with EntityManager.
    //EntityManager is an API that provides a collection of methods we can use to interact with the database.
    @Autowired
    EntityManager em;

    //In this example the method merge will add that User object to the database.
    @Override
    public User save(User user) {
        return em.merge(user);
    }

    @Override
    public void delete(User user) {
        User remove = em.merge(user);
        em.remove(remove);
    }

    @Override
    public User deleteById(long id) {
        User user = findById(id);
        em.remove(user);
        return user;
    }

    @Override
    public User deleteByEmail(String email) {
        User user = findByEmail(email);
        em.remove(user);
        return user;
    }

    @Override
    public User deleteByEmailId(String email, long id) {
        User user = findByEmail(email);
        em.remove(user);
        return user;
    }

    //Here it will get a list of all Users in the database.
    //I create a query with entity manager which will be returned in a list.
    @Override
    public List<User> findAll() {
        TypedQuery<User> query = em.createQuery("SELECT u FROM User u", User.class);
        return query.getResultList();
    }


    @Override
    public User findByEmail(String email) throws IllegalArgumentException {
        if (email == null){
            throw new IllegalArgumentException();
        } else {
            return em.find(User.class, email);
        }
    }

    @Override
    public User findByFirstName(String firstName) {
        return em.find(User.class, firstName);
    }

    @Override
    public User findByLastName(String lastName) {
        return em.find(User.class, lastName);
    }

    @Override
    public User findByEmailId(String email, long id) {
        return em.find(User.class, email);
    }

    @Override
    public User findById(long id) {
        return em.find(User.class, id);
    }
}
