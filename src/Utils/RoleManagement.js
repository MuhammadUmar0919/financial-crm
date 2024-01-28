// react redux import
import { useSelector } from "react-redux";
// Role nomlari noaniq emas bo'lgan rollarni alohida massivga ajratish
export const RoleManagement = () => {
    const { roleData } = useSelector((state) => state.roleReducer)
    const uniqueRoles = Array.from(new Set(roleData.map(role => role?.roleName)));
    return uniqueRoles
}