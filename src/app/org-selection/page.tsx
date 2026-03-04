import { OrganizationList } from "@clerk/nextjs";

export default function OrgSelectionPage() {
    return (
        <div>
            <OrganizationList 
                hidePersonal
                afterCreateOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-lg"
                    },
                }}
            />
        </div>
    )
}