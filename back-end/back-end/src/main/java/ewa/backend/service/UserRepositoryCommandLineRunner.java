package ewa.backend.service;

/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

import ewa.backend.entity.Project;
import ewa.backend.entity.User;
import ewa.backend.repository.ProjectRepositoryInterface;
import ewa.backend.repository.UserRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

//Component is a general Spring bean. It's not a certain specialization like Controller and Repo.
//This function implements CommandLineRunner, what this does is whenever the backend is started it will execute these commands.
//We use this to make some general dummy users for the database to work with.
@Component
public class UserRepositoryCommandLineRunner implements CommandLineRunner {

    @Autowired
    private UserRepositoryInterface userRepositoryInterface;

    @Autowired
    private ProjectRepositoryInterface projectRepository;

    //Here 2 user objects are created and given dummy info, then they are saved through the repository to the database.
    @Override
    public void run(String... args) {
        User user = new User(0, "Mark", "van Manen", "mark.van.manen@hva.nl", "d9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e", "06 12345678", "Admin", "Amstel", "020 354 8537");
        User user2 = new User(2, "Danial", "Iqbal", "danial.iqbal@hva.nl", "d9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e", "06 12345678", "Admin", "Centrum", "020 193 9203");
        userRepositoryInterface.save(user);
        userRepositoryInterface.save(user2);
        Project project50 = new Project(50, "Jordaan", "Jordaan", "assets/Img/jordaan.jpg", "De Jordaan is mogelijk de meest bekende en romantische buurt van Amsterdam. Vroeger een typische volksbuurt met een kleurrijk verleden, nu razend populair bij bezoeker en inwoner door de pittoreske grachten, kleine winkeltjes en knusse straten en stegen.", "5", "Nu", "Toekomst");
        Project project51 = new Project(51, "De Pijp", "De Pijp", "assets/Img/dePijp.jpg", "Het Quartier Latin van Amsterdam, met zijn rechte lange straten en goedkope arbeiderswoningen, heeft een roemrucht verleden van theatertjes, horeca, kleinschalige bedrijvigheid en verschillende culturen. Het nieuwere gedeelte valt op door een sensationele concentratie van Amsterdamse Schoolbouw en door charmante laagbouw in neorenaissancestijl: de huisjes voor de diamantslijpers van weleer.", "10", "Nu", "Toekomst");
        Project project52 = new Project(52, "Oud-Zuid", "Oud-Zuid", "assets/Img/oudZuid.jpg", "Oud-Zuid is een van Amsterdams mooiste en rijkste buurten, met indrukwekkende, brede lanen, imposante monumentale gebouwen, bijzondere boetieks en een aantal van de beste musea ter wereld. Van het culturele Museumplein, tot het levendige Vondelpark en de serene lanen langs de Willemsparkweg, de buurt straalt in al zijn glorie.", "70", "Nu", "Toekomst");
        Project project53 = new Project(53, "Bijlmer", "Bijlmer", "assets/Img/bijlmer.jpg", "Amsterdam is een stad die nooit lijkt stil te staan, maar in de Bijlmer swingt het echt altijd. In Zuidoost wonen mensen met wortels over de hele wereld: maar liefst 130 verschillende nationaliteiten. Al die culturen bij elkaar in één buurt zorgt ervoor dat Zuidoost een eigen stad met eigen verhalen is geworden. En dat voel je.", "30", "Nu", "Toekomst");
        Project project54 = new Project(54, "Voolbeeld Project", "Amsterdam Zuidoost (E-buurt)", "assets/Img/bijlmer.jpg", "Afgelopen jaren is er veel gebouwd in de E-buurt. Er kwamen nieuwe woningen, straten, groen en speelplekken. Binnenkort zal ook speellocatie Emerald opnieuw worden ingericht. Er komt meer ruimte voor groen maar het is nog niet besloten welk type groen. De gemeente Amsterdam vraagt u als bewoner om uw mening te geven voordat speelplek Emerald op de schop gaat. Zo kan er in het ontwerp rekening gehouden worden met de wensen van bewoners rondom Emerald. Door de Gezonde Groenwijzer in te vullen kunt u samen met uw buurt het projectteam helpen bij de herinrichting. \\n Op 15 februari 2020 zal een buurtbijeenkomst georganiseerd worden voor de volgende straten: Egoli, Elberveld, Enkeldoorn, Edenburg, Eerstegeluk, Eksteenfontein en Eversdal. De uitkomst van de Gezonde Groenwijzer zal dan besproken worden. Kunt u hier niet bij aanwezig zijn? Dan kunt u de resultaten van de Gezonde Groenwijzer online bekijken. Ook als u wel bij de bijeenkomst aanwezig kunt zijn is kunt u de resultaten vooraf online zien.", "30", "Nu", "Toekomst");
        projectRepository.saveProject(project50);
        projectRepository.saveProject(project51);
        projectRepository.saveProject(project52);
        projectRepository.saveProject(project53);
        projectRepository.saveProject(project54);

    }
}
