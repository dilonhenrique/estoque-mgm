import Link from "next/link";
import Icon from "../Icon/Icon";
import {
  Button,
  ButtonGroup,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { menuVariants } from "@/utils/animation/variants";
import { usePathname } from "next/navigation";
import { menuItems } from "@/utils/consts/menu";
import { Plus, X } from "lucide-react";
import Logo from "../Logo/Logo";

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
};

export default function MainMenu({ isOpen, closeMenu }: Props) {
  const pathname = usePathname();

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeMenu}
      motionProps={{ variants: menuVariants }}
      hideCloseButton
      radius="none"
      size="xs"
    >
      <ModalContent className="fixed top-0 left-0 !m-0 bg-content1/90 backdrop-blur-lg h-screen">
        {(onClose) => (
          <>
            <ModalHeader className="py-3 px-6 border-b border-content4 items-center gap-2">
              <Button
                isIconOnly
                onPress={onClose}
                radius="full"
                variant="light"
              >
                <X className="text-xl" />
              </Button>
              <Logo />
            </ModalHeader>
            <ModalBody className="px-4">
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.url);

                return (
                  <ButtonGroup className="w-full" key={`menu-${item.iconKey}`}>
                    <Button
                      onPress={closeMenu}
                      variant={isActive ? "solid" : "light"}
                      size="lg"
                      className={cn(
                        "justify-start text-default-500 px-4",
                        isActive && "bg-default-800 text-default font-semibold"
                      )}
                      fullWidth
                      as={Link}
                      href={item.url}
                      startContent={
                        <Icon
                          value={item.iconKey}
                          className="text-3xl"
                          strokeWidth={1.2}
                        />
                      }
                    >
                      {item.label}
                    </Button>
                    <Button
                      as={Link}
                      onPress={closeMenu}
                      href={`${item.url}/novo`}
                      isIconOnly
                      variant={isActive ? "solid" : "light"}
                      size="lg"
                      className={cn(
                        "text-default-500",
                        isActive && "bg-default-800 text-default font-semibold"
                      )}
                    >
                      <Plus className="text-xl" />
                    </Button>
                  </ButtonGroup>
                );
              })}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
