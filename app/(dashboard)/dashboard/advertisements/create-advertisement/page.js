import CodeAdvertisementForm from "@/components/AdvertisementsForms/code-advertisement-form";
import ImageAdvertisementForm from "@/components/AdvertisementsForms/image-advertisement-form";
import TextAdvertisementForm from "@/components/AdvertisementsForms/text-advertisement-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreateAdvertisement = () => {
    const tabsContents = [
        {
            value: "text-advertisement",
            title: "Text Advertisement",
            description: <TextAdvertisementForm/> ,
        },
        {
            value: "image-advertisement",
            title: "Image Advertisement",
            description: <ImageAdvertisementForm/>,
        },
        {
            value: "code-advertisement",
            title: "Code Advertisement",
            description: <CodeAdvertisementForm/>,
        },
    ];
  return (
    <div className="container mx-auto my-10" >
        <h2 className="text-2xl font-semibold text-center my-10" >Create New Advertisement</h2>
      <Tabs defaultValue={tabsContents[0].value} className="">
        <TabsList>
          {
            tabsContents.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            ))
          }
          
        </TabsList>
        {
          tabsContents.map((tab) => (
            <TabsContent className={"w-full"} key={tab.value} value={tab.value}>
              {tab.description}
            </TabsContent>
          ))
        }
       
      </Tabs>
    </div>
  );
};

export default CreateAdvertisement;
