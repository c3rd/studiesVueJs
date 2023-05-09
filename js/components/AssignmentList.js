import Assignment from "./Assignment.js";
import AssignmentTags from "./AssignmentTags.js";

export default {

    components: { Assignment, AssignmentTags },
    template: `
    <section v-if="assignments.length">
        <h1>{{ title }}</h1>
        
        <assignment-tags 
            :initial-tags="assignments.map(a => a.tag)" 
            v-model:currentTag = currentTag 
        />
        <ul class="border border-gray-600 divide-y divide-gray-600 mt-6">
            <assignment 
                v-for="assignment in filteredAssignments" 
                :key="assignment.id"
                :assignment="assignment"
            >
            </assignment>
        </ul>
    </section>
    `,
    props: {
        assignments: Array,
        title: String
    },
    data() {
        return {
            currentTag: 'all'
        };
    },
    computed: {
        filteredAssignments() {
            if (this.currentTag === 'all') {
                return this.assignments;
            }

            return this.assignments.filter(a => a.tag === this.currentTag);
        }
    }
}