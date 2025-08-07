import db from "#db/client";
import { createUser } from "#db/queries/users.js"
import { createStory } from "#db/queries/stories.js"

await db.connect();
await seed();
await db.end();
console.log("Database seeded.");

    async function seed() {
        for(let i = 1; i < 3; i++){
            const user = 
            {
                username: "fakename" + i,
                email: "i" + "fakeemail@fakeemail.com",
                password: "password123"
            };
        await createUser(user);
    };

        for(let i = 1; i < 3; i++){
            const stories = 
            {
                title: "Falling in Love, Part" + i,
                genre: "Romance",
                body_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor sollicitudin pharetra. Maecenas ut pharetra orci. Proin finibus, metus ut porta tempus, lacus risus aliquet lorem, vel suscipit elit velit sed diam. In luctus, arcu ac volutpat ultricies, dolor lorem rhoncus sem, sit amet finibus sem ante non eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere quis dolor vitae lacinia. Mauris blandit turpis vitae lorem tincidunt, placerat semper mi fermentum. Suspendisse potenti. Donec sed ultricies lacus. Fusce efficitur ut justo a laoreet."
            };
        await createStory(story);        
    };  
}
