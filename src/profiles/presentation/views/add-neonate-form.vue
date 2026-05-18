<script setup>
import { reactive } from 'vue';
import { useProfileStore } from '../../application/profiles.store.js';

const profileStore = useProfileStore();

const formData = reactive({
    nombre: '',
    apellidos: '',
    edad: '',
    peso: '',
    talla: '',
    tipoParto: '',
    grupoSanguineo: ''
});

const onGuardar = async () => {
    try {
        await profileStore.addNeonate(formData);
        alert('¡Bebé registrado correctamente!');
    } catch (error) {
        alert('Hubo un error al registrar.');
    }
};
</script>