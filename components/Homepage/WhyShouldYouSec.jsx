import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const WhyShouldYouSec = () => {
  const whyChooseCards = [
    {
      title: "Superior Quality",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. In asperiores quos accusantium eum sequi eius perferendis alias quas, esse quia culpa ex placeat, nesciunt cupiditate? Blanditiis praesentium voluptas laboriosam necessitatibus? Numquam facere molestias sunt, atque possimus magnam doloremque eum minima ab voluptas, hic deleniti corrupti nulla vel quo odio cum architecto officiis sequi soluta? Obcaecati recusandae ex, ad mollitia accusantium laboriosam, ut eum aut doloremque pariatur earum, deserunt sunt magnam. Est voluptas voluptates, tempora fuga minima odio obcaecati in quis aliquam suscipit molestias repellat similique. Atque modi corrupti id animi, accusantium cupiditate totam facilis, ea expedita saepe aliquid iste consequatur.",
    },
    {
      title: "Free Services",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. In asperiores quos accusantium eum sequi eius perferendis alias quas, esse quia culpa ex placeat, nesciunt cupiditate? Blanditiis praesentium voluptas laboriosam necessitatibus? Numquam facere molestias sunt, atque possimus magnam doloremque eum minima ab voluptas, hic deleniti corrupti nulla vel quo odio cum architecto officiis sequi soluta? Obcaecati recusandae ex, ad mollitia accusantium laboriosam, ut eum aut doloremque pariatur earum, deserunt sunt magnam. Est voluptas voluptates, tempora fuga minima odio obcaecati in quis aliquam suscipit molestias repellat similique. Atque modi corrupti id animi, accusantium cupiditate totam facilis, ea expedita saepe aliquid iste consequatur.",
    },
  ];
  return (
    <section className="my-10 p-4 font-roboto">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h1 className="md:text-5xl text-4xl font-bold font-playfair text-seo-forth-color text-center leading-14 md:leading-20 my-5 mb-10">
          Why Should You <br />
          Choose <br />
          <span className="text-seo-first-color">FreeDigitalTool?</span>
        </h1>
        <div className="flex justify-center items-center gap-5 flex-wrap flex-col md:flex-row">
          {whyChooseCards.map((card, index) => (
            <Card key={index} className="md:w-96  text-seo-second-color shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className={"text-seo-forth-color font-bold text-xl "} >{card.title}</CardTitle>
              </CardHeader>
              <CardContent className={"text-seo-des-color-second"} >{card.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyShouldYouSec;
